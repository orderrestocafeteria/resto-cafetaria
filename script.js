// Mengatur tanggal hari ini secara otomatis saat halaman dibuka
window.onload = function() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('tanggalPengiriman').value = today;
  calculateTotal();
};

// Fungsi mengubah select jika tombol ORDER SEKARANG diklik
function setSelectPackage(value) {
  const select = document.getElementById('paketSelect');
  select.value = value;
  calculateTotal();
}

// Cek batas minimal pesanan jika kategori Acara/Pernikahan dipilih
function checkMinimumOrder() {
  const kategori = document.getElementById('kategoriSelect').value;
  const jumlahInput = document.getElementById('jumlah');
  const minWarning = document.getElementById('minWarning');

  if (kategori === 'acara') {
    jumlahInput.min = 10;
    if (parseInt(jumlahInput.value) < 10) {
      jumlahInput.value = 10;
    }
    minWarning.style.display = 'block';
  } else {
    jumlahInput.min = 1;
    minWarning.style.display = 'none';
  }
  calculateTotal();
}

// Perhitungan Total
function calculateTotal() {
  const paketSelect = document.getElementById('paketSelect');
  const selectedPaket = paketSelect.options[paketSelect.selectedIndex];
  const paketPrice = parseFloat(selectedPaket.getAttribute('data-price')) || 0;

  const lokasiSelect = document.getElementById('lokasiSelect');
  const selectedLokasi = lokasiSelect.options[lokasiSelect.selectedIndex];
  const ongkirPrice = parseFloat(selectedLokasi.getAttribute('data-price')) || 0;

  const jumlah = parseInt(document.getElementById('jumlah').value) || 0;

  const total = (paketPrice * jumlah) + ongkirPrice;

  const isDollar = selectedPaket.text.includes('$') || selectedLokasi.text.includes('$');
  const currencySymbol = isDollar ? '$' : 'Rp';

  document.getElementById('totalHarga').innerText = currencySymbol + total.toLocaleString('id-ID');
}

// Membuat Invoice saat tombol BELI diklik
function generateInvoice() {
  const nama = document.getElementById('nama').value;
  const hp = document.getElementById('nomorHp').value;
  const kategoriSelect = document.getElementById('kategoriSelect');
  const kategoriText = kategoriSelect.options[kategoriSelect.selectedIndex].text;

  const paketSelect = document.getElementById('paketSelect');
  const selectedPaket = paketSelect.options[paketSelect.selectedIndex];
  const paketText = selectedPaket.text.split('-')[0].trim();
  const menuText = selectedPaket.getAttribute('data-menu');

  const jumlah = parseInt(document.getElementById('jumlah').value) || 0;
  const tanggal = document.getElementById('tanggalPengiriman').value;
  const jam = document.getElementById('jamPengiriman').value;

  const lokasiSelect = document.getElementById('lokasiSelect');
  const lokasiText = lokasiSelect.options[lokasiSelect.selectedIndex].text;

  const totalHarga = document.getElementById('totalHarga').innerText;

  // Validasi Input Nama, HP, dan Tanggal
  if (!nama || !hp || !tanggal) {
    alert('Silakan lengkapi Nama, Nomor HP, dan Tanggal!');
    return;
  }

  // Validasi Aturan Minimal 10 Paket
  if (kategoriSelect.value === 'acara' && jumlah < 10) {
    alert('Pemesanan untuk Acara / Pernikahan minimal harus 10 paket!');
    document.getElementById('jumlah').value = 10;
    calculateTotal();
    return;
  }

  // Isi data ke Invoice
  document.getElementById('invNama').innerText = nama;
  document.getElementById('invHp').innerText = hp;
  document.getElementById('invKategori').innerText = kategoriText;
  document.getElementById('invPaket').innerText = paketText;
  document.getElementById('invMenu').innerText = menuText;
  document.getElementById('invJumlah').innerText = jumlah;
  document.getElementById('invWaktu').innerText = `${tanggal} jam ${jam}`;
  document.getElementById('invLokasi').innerText = lokasiText;
  document.getElementById('invTotal').innerText = totalHarga;

  // Tampilkan Invoice
  const invoiceCard = document.getElementById('invoiceCard');
  invoiceCard.style.display = 'block';
  invoiceCard.scrollIntoView({ behavior: 'smooth' });
}
