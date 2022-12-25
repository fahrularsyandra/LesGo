# LesGo
aplikasi untuk pencarian course mandiri

## DOKUMENTASI API

| Method | Route                  | Keterangan                                                                                     |
| ------ | ---------------------- | ---------------------------------------------------------------------------------------------- |
| GET    | /                      | Menampilkan home                                                                               |
| GET    | /partners              | Menampilkan semua companies yang ada dalam database                                            |
| GET    | /partners/create       | Menampilkan halaman form untuk menambahkan data companies                                      |
| POST   | /partners/create       | Menerima data yang dikirim dari halaman `/partners/create` untuk melakukan _insertion_         |
| GET    | /partners/update/:id   | Menampilkan halaman form untuk mengubah data partners dari id                                  |
| POST   | /partners/update/:id   | Menerima data yang dikirim dari halaman `/partners/update/:id` untuk melakukan _update_        |
| GET    | /partners/delete/:id   | Melakukan _delete_ data companies berdasarkan `id` yang dikirimkan                             |
| GET    | /partners/:id          | Menampilkan informasi detail dari suatu companies/partner                                      |
| GET    | /courses               | Menampilkan semua courses yang ada dalam database, beserta dengan nama company penyedia course |
| GET    | /courses/create        | Menampilkan halaman form untuk menambahkan data courses                                        |
| POST   | /courses/create        | Menerima data yang dikirim dari halaman `/courses/create` untuk melakukan _insertion_          |
| GET    | /courses/update/:id    | Menampilkan halaman form untuk mengubah data courses dari id                                   |
| POST   | /courses/update/:id    | Menerima data yang dikirim dari halaman `/courses/update/:id` untuk melakukan _update_         |
| GET    | /courses/delete/:id    | Melakukan _delete_ data courses berdasarkan `id` yang dikirimkan                               |
| GET    | /partners/:partnerId/users/create | Menampilkan halaman form untuk menambahkan data users yang ingin mengikuti courses  |
| POST   | /partners/:partnerId/users/create | Menerima data yang dikirim dari halaman `/partners/:partnerId/users/create` untuk melakukan _insertion_ |
| GET    | /partners/:partnerId/users/update/:userId | Menampilkan halaman form untuk mengubah data user dari userId               |
| POST    | /partners/:partnerId/users/update/:userId | Menerima data yang dikirim dari halaman `/partners/:partnerId/users/update/:userId` untuk melakukan _update_ |
| GET    | /partners/:partnerId/users/delete/:userId | Melakukan _delete_ data user berdasarkan `userId` yang dikirimkan           |

