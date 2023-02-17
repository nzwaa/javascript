function tambahKategori(form) {
    console.log(form);
    aplikasiDaftarKategori.inputKategori(form);
    aplikasiDaftarKategori.menampilkanDaftarKategori();
}

const databaseDaftarKategori = {
    save(daftarKategori) {
        localStorage.setItem('daftarKategori', JSON.stringify(daftarKategori));
    },
    get() {
        return JSON.parse(localStorage.getItem('daftarKategori'));
    }
}

const aplikasiDaftarKategori = {
    kategori: {
        index: -1,
        nama: null
    },
    daftarKategori: [],
    inputKategori: function (form) {
        this.kategori.index = form.index.value;
        this.kategori.nama = form.nama.value;

        if(!this.kategori.nama) {
            alert('Nama tidak boleh kosong!');
            return false;
        }

        if(this.kategori.index == -1) {
            this.daftarKategori = this.daftarKategori || [];
            this.daftarKategori.push(copy(this.kategori));
        } else {
            this.daftarKategori[this.kategori.index] = copy(this.kategori)
        }

        databaseDaftarKategori.save(this.daftarKategori);
        this.resetFormKategori(form);
    },
    resetFormKategori: function (form) {
        this.kategori.nama = null;
        this.kategori.index = -1;

        form.nama.value = this.kategori.nama;
        form.index.value = this.kategori.index;

        document.getElementById('btn-save-kategori').innerHTML = 'Simpan';
    },
    menampilkanDaftarKategori: function () {
        this.daftarKategori = databaseDaftarKategori.get();
        const componentDaftarKategori = document.getElementById('daftar-kategori');
        componentDaftarKategori.innerHTML = '';
        if (this.daftarKategori === null) {
            console.log('Tidak ada kategori');
        } else {
        this.daftarKategori.forEach((kategori, index) => {
            componentDaftarKategori.innerHTML += `
            Nama : ${kategori.nama} <br> 
            <div class="card-actions justify-end"> 
                <button class="btn btn-xs mr-2" onclick="aplikasiDaftarKategori.editKategori(${index})">Edit</button>
                <button class="btn btn-xs btn-error" onclick="aplikasiDaftarKategori.hapusKategori(${index})">Hapus</button> 
                </div>
            </div> 
        </div>`;
            });
        }
    },
    hapusKategori: function (index) {
        if(confirm('Apakah anda yakin ingin menghapus data ini ?')) {
            this.daftarKategori.splice(index, 1);
            databaseDaftarKategori.save(this.daftarKategori);
            this.menampilkanDaftarKategori();
        }
    },
    editKategori: function (index) {
        const kategori = this.daftarKategori[index];
        const form = document.getElementById('form-kategori');
        form.nama.value = kategori.nama;
        form.index.value = index;

        document.getElementById('btn-save-kategori').innerHTML = 'Edit';
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

aplikasiDaftarKategori.menampilkanDaftarKategori();