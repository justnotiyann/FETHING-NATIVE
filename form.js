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
