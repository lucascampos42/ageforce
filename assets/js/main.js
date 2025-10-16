window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
  showNavOnScroll()
  showBackTopButtonOnScroll()
}

function showNavOnScroll() {
  if (window.scrollY > 100) {
    $("#navigation").addClass("scroll")
  } else {
    $("#navigation").removeClass("scroll")
  }
}

function showBackTopButtonOnScroll() {
  if (window.scrollY > 600) {
    $('#backToTopButton').show(200)
  } else {
    $('#backToTopButton').hide(200)
  }
}

$(window).on("load", function(){
  $('#video').html(`
  <video width="848" height="480" class="embed-responsive-item" controls>
    <source src="./assets/video/madeireira_petyk.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  `)
  
  // Configurar botão WhatsApp
  setupWhatsAppButton()
  
  // Configurar número de telefone
  setupPhoneNumber()
});

function setupWhatsAppButton() {
  // Obter número do WhatsApp da variável CSS
  const whatsappNumber = getComputedStyle(document.documentElement)
    .getPropertyValue('--whatsapp-number')
    .replace(/"/g, '')
    .trim()
  
  // Configurar botão WhatsApp flutuante
  const whatsappButton = document.getElementById('whatsappButton')
  if (whatsappButton && whatsappNumber) {
    const message = encodeURIComponent('Olá! Gostaria de mais informações sobre os produtos da AgForce.')
    whatsappButton.href = `https://wa.me/${whatsappNumber}?text=${message}`
  }
  
  // Configurar botão WhatsApp na seção de contato
  const contactWhatsappButton = document.getElementById('contactWhatsappButton')
  if (contactWhatsappButton && whatsappNumber) {
    const contactMessage = encodeURIComponent('Olá!! Vi seu site e queria saber mais sobre seus produtos!')
    contactWhatsappButton.href = `https://wa.me/send?phone=${whatsappNumber}&text=${contactMessage}`
   }
}

function setupPhoneNumber() {
  // Obter número de telefone da variável CSS
  const phoneNumber = getComputedStyle(document.documentElement)
    .getPropertyValue('--phone-number')
    .replace(/"/g, '')
    .trim()
  
  // Atualizar elemento do telefone
  const phoneElement = document.getElementById('phoneNumber')
  if (phoneElement && phoneNumber) {
    phoneElement.textContent = phoneNumber
  }
}