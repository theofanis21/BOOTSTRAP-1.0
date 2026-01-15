<?php
// Mengaktifkan error reporting untuk melihat jika ada masalah lain
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$user = "user20236021"; 
$pass = "N1v8Ed";     
$db   = "user20236021"; 

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

$notif = "";

if (isset($_POST['kirim_wbs'])) {
    // Menyesuaikan variabel dengan input form
    $nama    = mysqli_real_escape_string($conn, $_POST['nama_pelapor']);
    $email   = mysqli_real_escape_string($conn, $_POST['email_pelapor']);
    $telepon = mysqli_real_escape_string($conn, $_POST['telepon_pelapor']);
    $pesan   = mysqli_real_escape_string($conn, $_POST['pesan_laporan']);
    
    // Logika Upload File
    $nama_file_baru = "";
    if (isset($_FILES['bukti_file']) && $_FILES['bukti_file']['error'] == 0) {
        $nama_file = $_FILES['bukti_file']['name'];
        $tmp_file  = $_FILES['bukti_file']['tmp_name'];
        $folder    = "uploads/";

        if (!is_dir($folder)) {
            mkdir($folder, 0777, true);
        }

        $nama_file_baru = time() . "_" . str_replace(' ', '_', $nama_file);
        move_uploaded_file($tmp_file, $folder . $nama_file_baru);
    }

    // QUERY DISESUAIKAN DENGAN STRUKTUR TABEL ANDA
    // Kolom: nama, email, telepon, pesan, file_bukti
    $query = "INSERT INTO laporan_wbs (nama, email, telepon, pesan, file_bukti) 
              VALUES ('$nama', '$email', '$telepon', '$pesan', '$nama_file_baru')";
    
    if (mysqli_query($conn, $query)) {
        // REDIRECT untuk mencegah form resubmission
        header("Location: wbs.php?status=success");
        exit();
    } else {
        // REDIRECT dengan parameter error
        header("Location: wbs.php?status=error");
        exit();
    }
}

// Menampilkan notifikasi berdasarkan parameter URL
if (isset($_GET['status'])) {
    if ($_GET['status'] == 'success') {
        $notif = "<div class='alert alert-success'>Laporan berhasil dikirim! Terima kasih atas laporan Anda.</div>";
    } elseif ($_GET['status'] == 'error') {
        $notif = "<div class='alert alert-danger'>Gagal menyimpan laporan. Silakan coba lagi.</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>WBS - Whistleblowing System KPK</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        body { background-color: #f8f9fa; }
        .wbs-card { border-top: 5px solid #910f0f; border-radius: 10px; }
        .btn-kpk { background-color: #910f0f; color: white; }
        .btn-kpk:hover { background-color: #700a0a; color: white; }
    </style>
</head>
<body>

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                
                <div class="text-center mb-4">
                    <img src="assets/img/kpk.png" alt="Logo KPK" style="max-width: 150px;">
                    <h2 class="font-weight-bold mt-3" style="color: #910f0f;">Whistleblowing System (WBS)</h2>
                </div>

                <?php echo $notif; ?>

                <div class="card wbs-card shadow-sm p-4">
                    <form action="" method="POST" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label class="font-weight-bold">Nama Pelapor</label>
                                <input type="text" name="nama_pelapor" class="form-control" placeholder="Bisa anonim">
                            </div>
                            <div class="col-md-6 form-group">
                                <label class="font-weight-bold">Email</label>
                                <input type="email" name="email_pelapor" class="form-control" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="font-weight-bold">Nomor Telepon</label>
                            <input type="text" name="telepon_pelapor" class="form-control" placeholder="Contoh: 08123456789">
                        </div>

                        <div class="form-group">
                            <label class="font-weight-bold">Isi Laporan / Pesan</label>
                            <textarea name="pesan_laporan" class="form-control" rows="5" required placeholder="Jelaskan detail pengaduan Anda..."></textarea>
                        </div>

                        <div class="form-group">
                            <label class="font-weight-bold"><i class="fa fa-paperclip"></i> Lampirkan Bukti (file_bukti)</label>
                            <input type="file" name="bukti_file" class="form-control-file border p-2 rounded w-100">
                        </div>

                        <div class="mt-4">
                            <button type="submit" name="kirim_wbs" class="btn btn-kpk btn-block btn-lg shadow">Kirim Laporan</button>
                            <a href="index.php" class="btn btn-link btn-block text-muted">Kembali ke Beranda</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</body>
</html>


