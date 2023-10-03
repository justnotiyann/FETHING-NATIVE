// const get_form = document.getElementById('get_form')

// // get elemen
// const provinceId_element = document.getElementById('provinceId')
// const kota_element = document.getElementById('regencyId')
// const kecamatan_element = document.getElementById('districtId')
// const kelurahan_element = document.getElementById('villageId')


// async function fetchData(url) {
//     const response = await fetch(url)
//     const data = await response.json()
//     return data
// }


// get_form.addEventListener('submit', async function (e) {
//     e.preventDefault()

//     // Mendapatkan nilai provinsi
//     const nilai_provinsi = await fetchData(`api/province/${provinceId_element.value}.json`)

//     // Nilai Kota
//     const nilai_kota = await fetchData(`api/regencies/${kota_element.value}.json`)

//     // Nilai Kecamatan
//     const nilai_kecamatan = await fetchData(`api/districts/${kecamatan_element.value}.json`)

//     // Nilai Kelurahan
//     const nilai_kelurahan = await fetchData(`api/villages/${kelurahan_element.value}.json`)

//     console.log(`Nilai Provinsi : ${nilai_provinsi.name}`)
//     console.log(`Nilai Kota : ${nilai_kota.name}`)
//     console.log(`Nilai Kecamatan : ${nilai_kecamatan.name}`)
//     console.log(`Nilai Kelurahan : ${nilai_kelurahan.name}`)

// })


const get_form = document.getElementById('get_form')

// get elemen
const provinceId_element = document.getElementById('provinceId')
const kota_element = document.getElementById('regencyId')
const kecamatan_element = document.getElementById('districtId')
const kelurahan_element = document.getElementById('villageId')

async function fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

get_form.addEventListener('submit', async function (e) {
    e.preventDefault()

    // Mendapatkan nilai provinsi
    const nilai_provinsi = await fetchData(`api/province/${provinceId_element.value}.json`)

    const provinsi_name = nilai_provinsi.name || 'Nama Provinsi Tidak Ditemukan'


    console.log(`Nama Provinsi : ${provinsi_name}`)
})
