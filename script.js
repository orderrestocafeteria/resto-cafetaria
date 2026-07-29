// Fungsi mengubah select jika tombol ORDER SEKARANG diklik
function setSelectPackage(value) {
  const select = document.getElementById('paketSelect');
  select.value = value;
  calculateTotal();
}

// Perhitungan Total (Paket * Jumlah + Ongkir Lokasi)
function calculateTotal() {
  const paketSelect = document.getElementById('paketSelect');
  const selectedPaket = paketSelect.options[paketSelect.selectedIndex];
  const paketPrice = parseFloat(selectedPaket.getAttribute('data-price')) || 0;

  const lokasiSelect = document.getElementById('lokasiSelect');
  const selectedLokasi = lokasiSelect.options[lokasiSelect.selectedIndex];
  const ongkirPrice = parseFloat(selectedLokasi.getAttribute('data-price')) || 0;

  const jumlah = parseInt(document.getElementById('jumlah').value) || 0;

  const total = (paketPrice * jumlah) + ongkirPrice;

  // Cek simbol Rupiah / Dollar
  const isDollar = selectedPaket.text.includes('$') || selectedLokasi.text.includes('$');
  const currencySymbol = isDollar ? '$' : 'Rp';

  document.getElementById('totalHarga').innerText = currencySymbol + total.toLocaleString('id-ID');
}

// Membuat Invoice saat tombol BELI diklik
function generateInvoice() {
  const nama = document.getElementById('nama').value;
  const paketSelect = document.getElementById('paketSelect');
  const selectedPaket = paketSelect.options[paketSelect.selectedIndex];
  const paketText = selectedPaket.text.split('-')[0].trim();
  const menuText = selectedPaket.getAttribute('data-menu');

  const lokasiSelect = document.getElementById('lokasiSelect');
  const lokasiText = lokasiSelect.options[lokasiSelect.selectedIndex].text;

  const jumlah = document.getElementById('jumlah').value;
  const totalHarga = document.getElementById('totalHarga').innerText;

  if (!nama) {
    alert('Silakan masukkan nama Anda!');
    return;
  }

  // Set nilai invoice
  document.getElementById('invNama').innerText = nama;
  document.getElementById('invPaket').innerText = paketText;
  document.getElementById('invMenu').innerText = menuText;
  document.getElementById('invLokasi').innerText = lokasiText;
  document.getElementById('invJumlah').innerText = jumlah;
  document.getElementById('invTotal').innerText = totalHarga;

  // Tampilkan card invoice & scroll ke bawah
  const invoiceCard = document.getElementById('invoiceCard');
  invoiceCard.style.display = 'block';
  invoiceCard.scrollIntoView({ behavior: 'smooth' });
}

// Hitung pertama kali halaman dimuat
window.onload = function() {
  calculateTotal();
};
