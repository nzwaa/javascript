function tambahProduk(form) {
    console.log(form);
    aplikasiDaftarProduk.inputProduk(form);
    aplikasiDaftarProduk.menampilkanDaftarProduk();
}

const databaseDaftarProduk = {
    save(daftarProduk) {
        localStorage.setItem('daftarProduk', JSON.stringify(daftarProduk));
    },

    get() {
        return JSON.parse(localStorage.getItem('daftarProduk'));
    }
}

const aplikasiDaftarProduk = {
    produk: {
        index: -1,
        nama: null,
        harga: null,
        stok: null,
        gambar: null
    },
    daftarProduk: [],
    inputProduk: function (form) {
        this.produk.index = form.index.value;
        this.produk.nama = form.nama.value;
        this.produk.harga = form.harga.value;
        this.produk.stok = form.stok.value;
        this.produk.gambar = form.gambar.value;

        if(!this.produk.nama) {
            alert('Nama tidak boleh kosong!');
            return false;
        }

        if(!this.produk.harga) {
            alert('Harga tidak boleh kosong!');
            return false;
        }

        if(!this.produk.stok) {
            alert('Stok tidak boleh kosong!');
            return false;
        }

        if(!this.produk.gambar) {
            alert('Gambar tidak boleh kosong!');
            return false;
        }

        if(this.produk.index == -1) {
            this.daftarProduk = this.daftarProduk || [];
            this.daftarProduk.push(copy(this.produk));
        } else {
            this.daftarProduk[this.produk.index] = copy(this.produk)
        }
        databaseDaftarProduk.save(this.daftarProduk);
        this.resetFormProduk(form);
    },
    resetFormProduk: function (form) {
        this.produk.nama = null;
        this.produk.harga = null;
        this.produk.stok = null;
        this.produk.gambar = null;
        this.produk.index = -1;

        form.nama.value = this.produk.nama;
        form.harga.value = this.produk.harga;
        form.stok.value = this.produk.stok;
        form.gambar.value = this.produk.gambar;
        form.index.value = this.produk.index;

        document.getElementById('btn-save-produk').innerHTML = 'Tambah';
    },
    menampilkanDaftarProduk: function () {
        this.daftarProduk = databaseDaftarProduk.get();
        const componentDaftarProduk = document.getElementById('daftar-produk');
        componentDaftarProduk.innerHTML = '';
        if (this.daftarProduk === null) {
            console.log('Tidak ada produk');
        } else {
        this.daftarProduk.forEach((produk, index) => {
            componentDaftarProduk.innerHTML += `
            <div class="flex justify-between">
                <div> Nama : ${produk.nama} 
                <br> harga : ${produk.harga} 
                <br> Stok : ${produk.stok} 
                <br> <img src="${produk.gambar}" width="200" height="200";> <br>
                    <div class="card-actions justify-end">
                        <button class="btn btn-xs mr-2" onclick="aplikasiDaftarProduk.editProduk(${index})">Edit</button>
                        <button class="btn btn-xs btn-error" onclick="aplikasiDaftarProduk.hapusProduk(${index})">Hapus</button> 
                    </div>
                </div> 
            </div>`;
        });
    }
    },
    hapusProduk: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus data ini ?')) {
            this.daftarProduk.splice(index, 1);
            databaseDaftarProduk.save(this.daftarProduk);
            this.menampilkanDaftarProduk();
        }
    },
    editProduk: function (index) {
        const produk = this.daftarProduk[index];
        const form = document.getElementById('form-produk');
        form.nama.value = produk.nama;
        form.harga.value = produk.harga;
        form.stok.value = produk.stok;
        form.gambar.value = produk.gambar;
        form.index.value = index;

        document.getElementById('btn-save-produk').innerHTML = 'Edit';
    }
}
 
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

aplikasiDaftarProduk.menampilkanDaftarProduk();