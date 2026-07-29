// Fungsi untuk memilih paket
function selectPackage(element, name, price) {
  // Hapus kelas 'selected' dari semua kartu paket
  const cards = document.querySelectorAll('.package-card');
  cards.forEach(card => card.classList.remove('selected'));

  // Tambahkan kelas 'selected' ke kartu yang diklik
  element.classList.add('selected');

  // Simpan data paket ke hidden input
  document.getElementById('selectedPackageName').value = name;
  document.getElementById('selectedPackagePrice').value = price;
}

// Handler saat Form dikirim
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const packageName = document.getElementById('selectedPackageName').value;
  if (!packageName) {
    alert('Silakan pilih salah satu paket makanan terlebih dahulu!');
    return;
  }

  // Mengambil nilai input
  const nama = document.getElementById('nama').value;
  const phone = document.getElementById('phone').value;
  const alamat = document.getElementById('alamat').value;
  const discord = document.getElementById('discord').value;
  const jenisAcara = document.getElementById('jenisAcara').value;
  const tanggalAcara = document.getElementById('tanggalAcara').value;
  const jamAcara = document.getElementById('jamAcara').value;
  const packagePrice = document.getElementById('selectedPackagePrice').value;
  const metodeBayar = document.getElementById('metodeBayar').value;
  const catatan = document.getElementById('catatan').value || '-';

  // Tempatkan URL Discord Webhook Kamu Di Sini
  const webhookURL = 'MASUKKAN_URL_WEBHOOK_DISCORD_KAMU_DISINI';

  // Format pesan Webhook Discord Embed
  const payload = {
    embeds: [{
      title: "🍔 Pesanan Catering Masuk",
      color: 16758787,
      fields: [
        { name: "👤 Nama Pemesan", value: nama, inline: true },
        { name: "📞 No. Handphone", value: phone, inline: true },
        { name: "💬 Discord Username", value: discord, inline: false },
        { name: "📍 Alamat Pengiriman", value: alamat, inline: false },
        { name: "🎉 Jenis Acara", value: jenisAcara, inline: true },
        { name: "📅 Tanggal Acara", value: tanggalAcara, inline: true },
        { name: "⏰ Jam Acara", value: jamAcara, inline: true },
        { name: "📦 Paket Dibeli", value: `${packageName} ($${packagePrice})`, inline: false },
        { name: "💳 Metode Pembayaran", value: metodeBayar, inline: true },
        { name: "📝 Catatan", value: catatan, inline: false }
      ],
      footer: { text: "Resto-Cafetaria Order System" },
      timestamp: new Date().toISOString()
    }]
  };

  // Kirim data ke Discord Webhook
  if (webhookURL && webhookURL !== 'MASUKKAN_URL_WEBHOOK_DISCORD_KAMU_DISINI') {
    fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        alert('Pesanan berhasil dikirim ke Discord!');
        document.getElementById('orderForm').reset();
        document.querySelectorAll('.package-card').forEach(c => c.classList.remove('selected'));
      } else {
        alert('Gagal mengirim pesanan. Cek URL Webhook Anda.');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Terjadi kesalahan koneksi.');
    });
  } else {
    alert('Pesanan berhasil dibuat di tampilan lokal! (Lengkapi webhookURL di script.js agar terhubung ke Discord)');
  }
});
          
