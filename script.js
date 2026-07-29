function toggleLokasi() {
    const metode = document.getElementById('metode').value;
    const lokasiGroup = document.getElementById('lokasiGroup');
    lokasiGroup.style.display = (metode === 'DIANTAR') ? 'block' : 'none';
}

function updatePreviewImg() {
    const paketSelect = document.getElementById('namaPaket');
    const selectedOption = paketSelect.options[paketSelect.selectedIndex];
    const imgName = selectedOption.getAttribute('data-img');
    document.getElementById('paketImg').src = imgName;
}

function generateForm() {
    const jumlahVal = parseInt(document.getElementById('jumlah').value) || 0;

    // Validasi Pembelian Minimal 10
    if (jumlahVal < 10) {
        alert('Pemesanan Catering minimal 10 paket!');
        return;
    }

    const namaIc = document.getElementById('namaIc').value || '-';
    const noHp = document.getElementById('noHp').value || '-';
    
    // Ambil Informasi Paket
    const paketSelect = document.getElementById('namaPaket');
    const namaPaket = paketSelect.value;
    const hargaPerPaket = parseInt(paketSelect.options[paketSelect.selectedIndex].getAttribute('data-harga')) || 0;

    const keperluan = document.getElementById('keperluan').value || '-';
    const tglPesan = document.getElementById('tglPesan').value || '-';
    const tglAmbil = document.getElementById('tglAmbil').value || '-';
    const metode = document.getElementById('metode').value;
    
    // Hitung Ongkir
    const lokasiSelect = document.getElementById('lokasi');
    let ongkir = 0;
    let lokasiText = '-';

    if (metode === 'DIANTAR') {
        lokasiText = lokasiSelect.value;
        ongkir = parseInt(lokasiSelect.options[lokasiSelect.selectedIndex].getAttribute('data-ongkir')) || 0;
    }

    const jam = document.getElementById('jam').value || '-';
    const note = document.getElementById('note').value || '-';

    // Hitung Total Pembayaran
    const totalHarga = (hargaPerPaket * jumlahVal) + ongkir;
    const totalFormatted = '$' + totalHarga.toLocaleString('en-US');

    // Format Pesanan Ringkas
    const resultText = `NAMA IC       : ${namaIc}
NO. HP IC     : ${noHp}
NAMA PAKET    : ${namaPaket}
JUMLAH        : ${jumlahVal}
KEPERLUAN     : ${keperluan}
TANGGAL PESAN : ${tglPesan}
TANGGAL AMBIL : ${tglAmbil}
ANTAR/AMBIL   : ${metode}
JAM           : ${jam}
LOKASI        : ${lokasiText}

TOTAL HARGA   : ${totalFormatted}

NOTE : ${note}`;

    const outputDiv = document.getElementById('output');
    outputDiv.style.display = 'block';
    outputDiv.innerText = resultText;

    navigator.clipboard.writeText(resultText);
    alert('Form Pemesanan Catering berhasil disalin!');
}
