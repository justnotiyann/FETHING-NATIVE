async function fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function populateSelect(elementId, apiUrl) {
    const selectElement = document.getElementById(elementId)
    const data = await fetchData(apiUrl)

    data.forEach((item) => {
        const option = document.createElement("option")
        option.value = item.id
        option.text = item.name
        selectElement.appendChild(option)
    })
}

async function populateProvinces() {
    await populateSelect("provinceId", "api/provinces.json")
}

async function populateRegencies() {
    const provinceId = document.getElementById("provinceId").value
    console.log(provinceId)
    if (provinceId) {
        await populateSelect("regencyId", `api/regencies/${provinceId}.json`)
    }
}

async function populateDistricts() {
    const regencyId = document.getElementById("regencyId").value
    if (regencyId) {
        await populateSelect("districtId", `api/districts/${regencyId}.json`)
    }
}

async function populateVillages() {
    const districtId = document.getElementById("districtId").value
    if (districtId) {
        await populateSelect("villageId", `api/villages/${districtId}.json`)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateProvinces()

    document.getElementById("provinceId").addEventListener("change", () => {
        document.getElementById("regencyId").innerHTML = "<option value=''></option>"
        document.getElementById("districtId").innerHTML = "<option value=''></option>"
        document.getElementById("villageId").innerHTML = "<option value=''></option>"
        populateRegencies()
    })

    document.getElementById("regencyId").addEventListener("change", () => {
        document.getElementById("districtId").innerHTML = "<option value=''></option>"
        document.getElementById("villageId").innerHTML = "<option value=''></option>"
        populateDistricts()
    })

    document.getElementById("districtId").addEventListener("change", () => {
        document.getElementById("villageId").innerHTML = "<option value=''></option>"
        populateVillages()
    })
})
