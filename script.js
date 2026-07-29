function showMenu(menu) {

    const card = document.getElementById("card");

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {

        if (menu === "home") {
            card.innerHTML = `
                <h1>👋 Selamat Datang</h1>
                <p>Selamat datang di <b>RESTO CAFETARIA</b>.</p>
                <p>Pilih paket makanan melalui menu di sebelah kiri.</p>
                <p>✨ Menu dibuat dengan tampilan ala Discord.</p>
            `;
        }

        if (menu === "hemat") {
            card.innerHTML = `
                <h2>💚 Paket Hemat</h2>
                <img src="Hemat.png" alt="Paket Hemat">
                <p><b>💰 Harga:</b> Rp20.000</p>
                <p>🍚 Nasi Goreng</p>
                <p>🥤 Es Teh Manis</p>
                <button class="pesan" onclick="pesan()">🛒 Pesan Sekarang</button>
            `;
        }

        if (menu === "medium") {
            card.innerHTML = `
                <h2>⭐ Paket Medium</h2>
                <img src="Medium.png" alt="Paket Medium">
                <p><b>💰 Harga:</b> Rp35.000</p>
                <p>🍗 Ayam Geprek</p>
                <p>🥤 Es Teh</p>
                <button class="pesan" onclick="pesan()">🛒 Pesan Sekarang</button>
            `;
        }

        if (menu === "high") {
            card.innerHTML = `
                <h2>🔥 Paket High</h2>
                <img src="High.png" alt="Paket High">
                <p><b>💰 Harga:</b> Rp50.000</p>
                <p>🍛 Nasi Goreng Spesial</p>
                <p>☕ Kopi Kenangan</p>
                <button class="pesan" onclick="pesan()">🛒 Pesan Sekarang</button>
            `;
        }

        if (menu === "small") {
            card.innerHTML = `
                <h2>🍜 Paket Small</h2>
                <img src="Small.png" alt="Paket Small">
                <p><b>💰 Harga:</b> Rp15.000</p>
                <p>🍜 Bakso</p>
                <p>🥤 Choco Matcha</p>
                <button class="pesan" onclick="pesan()">🛒 Pesan Sekarang</button>
            `;
        }

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, 200);
}

function pesan() {
    const notif = document.getElementById("notif");

    notif.classList.add("show");

    setTimeout(() => {
        notif.classList.remove("show");
    }, 2500);
}
