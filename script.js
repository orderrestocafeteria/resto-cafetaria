// Fungsi kalkulasi harga otomatis
function calculateTotal() {
  const paketSelect = document.getElementById('paketSelect');
  if (!paketSelect) return;

  const selectedPaket = paketSelect.options[paketSelect.selectedIndex];
  const paketPrice = parseFloat(selectedPaket.getAttribute('data-price')) || 0;

  const lokasiSelect = document.getElementById('lokasiSelect');
  const selectedLokasi = lokasiSelect.options[lokasiSelect.selectedIndex];
  const ongkirPrice = parseFloat(selectedLokasi.getAttribute('data-price')) || 0;

  const jumlahInput = document.getElementById('jumlah');
  const jumlah = parseInt(jumlahInput.value) || 1;

  const total = (paketPrice * jumlah) + ongkirPrice;

  // Cek simbol mata uang
  const isDollar = selectedPaket.text.includes('$') || selectedLokasi.text.includes('$');
  const currencySymbol = isDollar ? '$' : 'Rp';

  document.getElementById('totalHarga').innerText = currencySymbol + total.toLocaleString('id-ID');
}

// Cek batas minimal pesanan jika Kategori Acara dipilih
function checkMinimumOrder() {
  const kategori = document.getElementById('kategoriSelect').value;
  const jumlahInput = document.getElementById('jumlah');
  const minWarning = document.getElementById('minWarning');

  if (kategori === 'acara') {
    jumlahInput.min = 10;
    if (parseInt(jumlahInput.value) < 10) {
      jumlahInput.value = 10;
    }
    if (minWarning) minWarning.style.display = 'block';
  } else {
    jumlahInput.min = 1;
    if (minWarning) minWarning.style.display = 'none';
  }
  calculateTotal();
}

// Fungsi membuat Invoice saat tombol BELI diklik
function generateInvoice() {
  const namaEl = document.getElementById('nama');
  const hpEl = document.getElementById('nomorHp');
  const tanggalEl = document.getElementById('tanggalPengiriman');

  const nama = namaEl ? namaEl.value.trim() : '';
  const hp = hpEl ? hpEl.value.trim() : '';
  const tanggal = tanggalEl ? tanggalEl.value : '';

  // Jika nama atau HP belum diisi
  if (!nama || !hp) {
    alert('Harap isi Nama Pemesan dan Nomor HP terlebih dahulu!');
    return;
  }

  const kategoriSelect = document.getElementById('kategoriSelect');
  const kategoriText = kategoriSelect.options[kategoriSelect.selectedIndex].text;

  const paketSelect = document.getElementById('paketSelect');
  const selectedPaket = paketSelect.options[paketSelect.selectedIndex];
  const paketText = selectedPaket.text.split('-')[0].trim();
  const menuText = selectedPaket.getAttribute('data-menu') || '-';

  const jumlah = document.getElementById('jumlah').value;
  const jam = document.getElementById('jamPengiriman').value;

  const lokasiSelect = document.getElementById('lokasiSelect');
  const lokasiText = lokasiSelect.options[lokasiSelect.selectedIndex].text;

  const totalHarga = document.getElementById('totalHarga').innerText;

  // Masukkan data ke tampilan Invoice
  if (document.getElementById('invNama')) document.getElementById('invNama').innerText = nama;
  if (document.getElementById('invHp')) document.getElementById('invHp').innerText = hp;
  if (document.getElementById('invKategori')) document.getElementById('invKategori').innerText = kategoriText;
  if (document.getElementById('invPaket')) document.getElementById('invPaket').innerText = paketText;
  if (document.getElementById('invMenu')) document.getElementById('invMenu').innerText = menuText;
  if (document.getElementById('invJumlah')) document.getElementById('invJumlah').innerText = jumlah;
  if (document.getElementById('invWaktu')) document.getElementById('invWaktu').innerText = (tanggal ? tanggal : 'Hari ini') + ' jam ' + jam;
  if (document.getElementById('invLokasi')) document.getElementById('invLokasi').innerText = lokasiText;
  if (document.getElementById('invTotal')) document.getElementById('invTotal').innerText = totalHarga;

  // Tampilkan card invoice & gulir otomatis ke bawah
  const invoiceCard = document.getElementById('invoiceCard');
  if (invoiceCard) {
    invoiceCard.style.display = 'block';
    invoiceCard.scrollIntoView({ behavior: 'smooth' });
  }
}

// Pilih paket dari tombol ORDER SEKARANG
function setSelectPackage(value) {
  const select = document.getElementById('paketSelect');
  if (select) {
    select.value = value;
    calculateTotal();
  }
}

// Jalankan otomatis saat web dimuat
document.addEventListener('DOMContentLoaded', function() {
  const tanggalInput = document.getElementById('tanggalPengiriman');
  if (tanggalInput && !tanggalInput.value) {
    const today = new Date().toISOString().split('T')[0];
    tanggalInput.value = today;
  }
  calculateTotal();
});
