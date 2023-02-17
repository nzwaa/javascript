function tambahTransaksi(form) {
    console.log(form);
    aplikasiTransaksiPenjualan.inputTransaksi(form);
    aplikasiTransaksiPenjualan.menampilkanTransaksiPenjualan();
}

const databaseDaftarTransaksi = {
    save(daftarTransaksi) {
        localStorage.setItem('daftarTransaksi', JSON.stringify(daftarTransaksi));
    },

    get() {
        return JSON.parse(localStorage.getItem('daftarTransaksi'));
    }
}

const aplikasiTransaksiPenjualan = {
    transaksi: {
        index: -1,
        nama: null,
        harga: null,
        stok: null,
        gambar: null,
        jumlah : null,
        total : null,
        tunai : null,
        kembali : null
    },
    daftarTransaksi: [],
    inputTransaksi: function (form) {
        this.transaksi.index = form.index.value;
        this.transaksi.nama = form.nama.value;
        this.transaksi.harga = form.harga.value;
        this.transaksi.stok = form.stok.value;
        this.transaksi.gambar = form.gambar.value;
        this.transaksi.jumlah = form.jumlah.value;
        this.transaksi.total = form.total.value;
        this.transaksi.tunai = form.tunai.value;
        this.transaksi.kembali = form.kembali.value;

        if(!this.transaksi.nama) {
            alert('Nama tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.harga) {
            alert('Harga tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.stok) {
            alert('Stok tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.gambar) {
            alert('Gambar tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.jumlah) {
            alert('Jumlah tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.total) {
            alert('Total tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.tunai) {
            alert('Tunai tidak boleh kosong!');
            return false;
        }
        if(!this.transaksi.kembali) {
            alert('Kembalian tidak boleh kosong!');
            return false;
        }
        if(this.transaksi.index == -1) {
            this.daftarTransaksi = this.daftarTransaksi || [];
            this.daftarTransaksi.push(copy(this.transaksi));
        } else {
            this.daftarTransaksi[this.transaksi.index] = copy(this.transaksi)
        }
        databaseDaftarTransaksi.save(this.daftarTransaksi);
        this.resetFormTransaksi(form);
    },
    resetFormTransaksi: function (form) {
        this.transaksi.nama = null;
        this.transaksi.harga = null;
        this.transaksi.stok = null;
        this.transaksi.gambar = null;
        this.transaksi.jumlah = null;
        this.transaksi.total = null;
        this.transaksi.tunai = null;
        this.transaksi.kembali = null;
        this.transaksi.index = -1;

        form.nama.value = this.transaksi.nama;
        form.harga.value = this.transaksi.harga;
        form.stok.value = this.transaksi.stok;
        form.gambar.value = this.transaksi.gambar;
        form.jumlah.value = this.transaksi.jumlah;
        form.total.value = this.transaksi.total;
        form.tunai.value = this.transaksi.tunai;
        form.kembali.value = this.transaksi.kembali;
        form.index.value = this.transaksi.index;
    },
    menampilkanTransaksiPenjualan: function () {
        this.daftarTransaksi = databaseDaftarTransaksi.get();
        const componentTransaksiPenjualan = document.getElementById('daftar-transaksi');
        componentTransaksiPenjualan.innerHTML = '';
        if (this.daftarTransaksi === null) {
            console.log('Tidak ada transaksi');
        } else {
        this.daftarTransaksi.forEach((transaksi, index) => {
            componentTransaksiPenjualan.innerHTML += `
            <div class="flex justify-between">
                <div> Nama: ${transaksi.nama} 
                <br> Harga : ${transaksi.harga} 
                <br> Stok : ${transaksi.stok} 
                <br> Jumlah :${transaksi.jumlah} 
                <br> total : ${transaksi.total} 
                <br> tunai : ${transaksi.tunai} 
                <br> kembalian : ${transaksi.kembali} 
                <br> <img src="${transaksi.gambar}" width="200" height="200";>
                <div>  
            </div>`;
        });
    }
    },
}
function copy(obj) {
return JSON.parse(JSON.stringify(obj));
}

aplikasiTransaksiPenjualan.menampilkanTransaksiPenjualan();