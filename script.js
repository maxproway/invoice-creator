let invoiceServices = [];
let amount = 0;

function addService(e) {
    const serviceBtn = document.getElementById(e.id);
    if (serviceBtn.classList.contains("service-item-active")) {
        return;
    }
    let serviceId = e.id;
    let serviceName = e.innerText.slice(0, -5);
    let servicePrice = parseInt(e.innerText.slice(-2));

    invoiceServices.push({
        id: serviceId,
        name: serviceName,
        price: servicePrice,
    });

    // console.log(e.id);
    serviceBtn.classList.add("service-item-active");
    renderHtml();
}

function removeService(id) {
    invoiceServices = invoiceServices.filter((service) => service.id != id);
    clearActiveBtn(id);
    renderHtml();
}

function sendInvoice() {
    amount = 0;
    invoiceServices.forEach((service) => {
        clearActiveBtn(service.id);
    });

    invoiceServices = [];
    document.getElementById("invoice-services").innerHTML = "";
    document.getElementById("total-invoice").style.display = "none";
}

function clearActiveBtn(id) {
    document.getElementById(id).classList.remove("service-item-active");
}

function renderHtml() {
    let invoiceServicesHtml = invoiceServices
        .map((service) => {
            return `<div id="${service.id}" class="added-service">
                        <div class="added-service-title">${service.name}<span onclick="removeService('${service.id}')">Remove</span></div>
                        <div class="added-service-price"><span>$</span>${service.price}</div>
                     </div>`;
        })
        .join("");

    amount = invoiceServices.reduce((total, service) => {
        return total + service.price;
    }, 0);

    document.getElementById("invoice-services").innerHTML = invoiceServicesHtml;
    document.getElementById("total-invoice-cost").innerHTML = `$${amount}`;
    document.getElementById("total-invoice").style.display = "flex";
}
