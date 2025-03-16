## Docker Image Oluşturma
Öncelikle 2 adet ENV variable set etmemiz gerekiyor. ```env.local.example``` dosyasında SET edilmesi gereken değişkenler örnek ile mevcut.

Ardından ```docker compose up -d``` komutu, docker imajı PROD modda oluşturacaktır.

## DEV Ortamı
Henüz DEV ortamı için bir docker düzeneği kurmadım. O yüzden, ```.env.local.``` dosyası oluşturup ```env.local.example``` dosyasındaki değişkenleri tanımladıktan sonra ```npm install``` kullanabilirsiniz. Ardından projeyi development modda çalıştırmak için ```npm run dev``` komutunu kullanmanız gerek.

Proje, ```node 22.14``` ile oluşturuldu.
