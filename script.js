function showMenu(paket){

    document.getElementById("paket").value =
        paket.charAt(0).toUpperCase() + paket.slice(1);

    document.querySelector(".form").scrollIntoView({
        behavior:"smooth"
    });

}

function pesan(){

    const nama = document.querySelector("input[type='text']").value;
    const paket = document.getElementById("paket").value;
    const jumlah = document.getElementById("jumlah").value;

    if(nama===""){
        alert("Silakan masukkan nama terlebih dahulu!");
        return;
    }

    let harga = 0;

    if(paket==="Paket Hemat") harga = 20000;
    if(paket==="Paket Medium") harga = 35000;
    if(paket==="Paket High") harga = 50000;
    if(paket==="Paket Small") harga = 15000;

    const total = harga * jumlah;

    const notif = document.getElementById("notif");

    notif.innerHTML = `
    ✅ Pesanan Berhasil<br><br>

    👤 Nama : ${nama}<br>
    🍽 Paket : ${paket}<br>
    📦 Jumlah : ${jumlah}<br>
    💰 Total : Rp${total.toLocaleString("id-ID")}
    `;

    notif.classList.add("show");

    setTimeout(()=>{
        notif.classList.remove("show");
    },4000);

}
