// Mendapatkan data keranjang dari localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menampilkan rincian item yang dibeli di halaman pembayaran
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountContainer = document.getElementById('total-amount');
    let totalAmount = 0;

    // Menghapus semua item lama di tabel
    cartItemsContainer.innerHTML = '';

    // Menambahkan item-item ke dalam tabel
    cart.forEach(item => {
        const row = document.createElement('tr');
        
        // Membuat baris untuk setiap item yang dibeli
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);

        // Menambahkan total harga
        totalAmount += item.price * item.quantity;
    });

    // Menampilkan total harga
    totalAmountContainer.textContent = `$${totalAmount.toFixed(2)}`;
}

// Fungsi untuk menangani klik tombol pembayaran
document.getElementById('proceed-payment').addEventListener('click', function() {
    // Menampilkan notifikasi pembayaran berhasil
    const successNotification = document.getElementById('payment-success-notification');
    successNotification.style.display = 'block';

    // Menunggu beberapa detik, kemudian kembali ke halaman utama
    setTimeout(function() {
        // Menghapus keranjang setelah pembayaran berhasil
        localStorage.removeItem('cart');
        
        // Mengarahkan kembali ke halaman utama
        window.location.href = "./index.html"; // Ganti dengan nama file halaman utama Anda
    }, 2000); // Setelah 2 detik (2000 ms)
});

// Panggil fungsi untuk menampilkan rincian pembelian saat halaman dimuat
window.addEventListener('DOMContentLoaded', displayCartItems);
