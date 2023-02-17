function tambahKonsumen(form) {  
    console.log(form);
    aplikasiDaftarKonsumen.inputKonsumen(form);
    aplikasiDaftarKonsumen.menampilkanDaftarKonsumen();
}

const databaseDaftarKonsumen = {
    save(daftarKonsumen) {
        localStorage.setItem('daftarKonsumen', JSON.stringify(daftarKonsumen));
    },
    get() {
        return JSON.parse(localStorage.getItem('daftarKonsumen'));
    }
}

const aplikasiDaftarKonsumen = {
    konsumen: {
        index: -1,
        nama: null,
        alamat: null,
        no: null,
        email: null
    },
    daftarKonsumen: [],
    inputKonsumen: function (form) {
        this.konsumen.index = form.index.value;
        this.konsumen.nama = form.nama.value;
        this.konsumen.alamat = form.alamat.value;
        this.konsumen.no = form.no.value;
        this.konsumen.email = form.email.value;
    
        if(!this.konsumen.nama) {
            alert('Nama tidak boleh kosong!');
            return false;
        }
        if(!this.konsumen.alamat) {
            alert('Alamat tidak boleh kosong!');
            return false;
        }
        if(!this.konsumen.no) {
            alert('No HP tidak boleh kosong!');
            return false;
        }
        if(!this.konsumen.email) {
            alert('Email tidak boleh kosong!');
            return false;
        }
        if(this.konsumen.index == -1) {
            this.daftarKonsumen = this.daftarKonsumen || [];
            this.daftarKonsumen.push(copy(this.konsumen));
        } else {
            this.daftarKonsumen[this.konsumen.index] = copy(this.konsumen)
        }

        databaseDaftarKonsumen.save(this.daftarKonsumen);
        this.resetFormKonsumen(form);
    },
    resetFormKonsumen: function (form) {
        this.konsumen.nama = null;
        this.konsumen.alamat = null;
        this.konsumen.no = null;
        this.konsumen.email = null;
        this.konsumen.index = -1;

        form.nama.value = this.konsumen.nama;
        form.alamat.value = this.konsumen.alamat;
        form.no.value = this.konsumen.no;
        form.email.value = this.konsumen.email;
        form.index.value = this.konsumen.index;

        document.getElementById('btn-save-konsumen').innerHTML = 'Simpan';
    },
    menampilkanDaftarKonsumen: function () {
        this.daftarKonsumen = databaseDaftarKonsumen.get();
        const componentDaftarKonsumen = document.getElementById('daftar-konsumen');
        componentDaftarKonsumen.innerHTML = '';
        if (this.daftarKonsumen === null) {
            console.log('Tidak ada konsumen');
        } else {
        this.daftarKonsumen.forEach((konsumen, index) => {
            componentDaftarKonsumen.innerHTML += `
            <div class="flex justify-between">
                <div> Nama : ${konsumen.nama}
                <br> Alamat : ${konsumen.alamat} 
                <br> No Hp : ${konsumen.no} 
                <br> Email : ${konsumen.email} <br>
                    <div class="card-actions justify-end">
                        <button class="btn btn-xs mr-2" onclick="aplikasiDaftarKonsumen.editKonsumen(${index})">Edit</button>
                        <button class="btn btn-xs btn-error" onclick="aplikasiDaftarKonsumen.hapusKonsumen(${index})">Hapus</button> 
                    </div>
                </div> 
            </div>`;
        });
        }
    },
        hapusKonsumen: function (index) {
            if(confirm('Apakah anda yakin ingin menghapus data ini ?')) {
                this.daftarKonsumen.splice(index, 1);
                databaseDaftarKonsumen.save(this.konsumen);
                this.menampilkanDaftarKonsumen();
            }
        },
            editKonsumen: function (index) {
            const konsumen = this.daftarKonsumen[index];
            const form = document.getElementById('form-konsumen');
                form.nama.value = konsumen.nama;
                form.alamat.value = konsumen.alamat;
                form.no.value = konsumen.no;
                form.email.value = konsumen.email;
                form.index.value = index;

            document.getElementById('btn-save-konsumen').innerHTML = 'Edit';
            }
        }
        function copy(obj) {
        return JSON.parse(JSON.stringify(obj));
        } 

        aplikasiDaftarKonsumen.menampilkanDaftarKonsumen();