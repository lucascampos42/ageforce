// Validação e funcionalidade do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    // Verificar se o formulário existe
    if (!form) {
        return; // Sair se não houver formulário
    }
    
    const submitBtn = form.querySelector('.btn-submit');
    const submitStatus = document.getElementById('submit-status');
    
    // Elementos do formulário
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const mensagemInput = document.getElementById('mensagem');
    
    // Máscaras e validações
    function aplicarMascaraTelefone(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Aplicar máscara ao telefone
    aplicarMascaraTelefone(telefoneInput);
    
    // Validação em tempo real
    function validarCampo(input, validationFn, errorMessage) {
        const errorElement = document.getElementById(input.id + '-error');
        
        input.addEventListener('blur', function() {
            if (input.value.trim() && !validationFn(input.value)) {
                mostrarErro(input, errorElement, errorMessage);
            } else if (input.hasAttribute('required') && !input.value.trim()) {
                mostrarErro(input, errorElement, 'Este campo é obrigatório');
            } else {
                limparErro(input, errorElement);
            }
        });
        
        input.addEventListener('input', function() {
            if (errorElement.textContent) {
                if (input.value.trim() && validationFn(input.value)) {
                    limparErro(input, errorElement);
                } else if (!input.hasAttribute('required') && !input.value.trim()) {
                    limparErro(input, errorElement);
                }
            }
        });
    }
    
    function mostrarErro(input, errorElement, message) {
        input.style.borderColor = '#dc3545';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function limparErro(input, errorElement) {
        input.style.borderColor = '#e1e5e9';
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    // Funções de validação
    function validarNome(nome) {
        return nome.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(nome);
    }
    
    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validarTelefone(telefone) {
        const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return telefoneRegex.test(telefone);
    }
    
    function validarMensagem(mensagem) {
        return mensagem.trim().length >= 10;
    }
    
    // Aplicar validações
    validarCampo(nomeInput, validarNome, 'Nome deve ter pelo menos 2 caracteres e conter apenas letras');
    validarCampo(emailInput, validarEmail, 'Por favor, insira um e-mail válido');
    validarCampo(telefoneInput, validarTelefone, 'Por favor, insira um telefone válido');
    validarCampo(mensagemInput, validarMensagem, 'Mensagem deve ter pelo menos 10 caracteres');
    
    // Validação completa do formulário
    function validarFormulario() {
        let isValid = true;
        const campos = [
            { input: nomeInput, validator: validarNome, message: 'Nome deve ter pelo menos 2 caracteres e conter apenas letras' },
            { input: emailInput, validator: validarEmail, message: 'Por favor, insira um e-mail válido' },
            { input: telefoneInput, validator: validarTelefone, message: 'Por favor, insira um telefone válido' },
            { input: mensagemInput, validator: validarMensagem, message: 'Mensagem deve ter pelo menos 10 caracteres' }
        ];
        
        campos.forEach(campo => {
            const errorElement = document.getElementById(campo.input.id + '-error');
            
            if (!campo.input.value.trim()) {
                mostrarErro(campo.input, errorElement, 'Este campo é obrigatório');
                isValid = false;
            } else if (!campo.validator(campo.input.value)) {
                mostrarErro(campo.input, errorElement, campo.message);
                isValid = false;
            } else {
                limparErro(campo.input, errorElement);
            }
        });
        
        return isValid;
    }
    
    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validarFormulario()) {
            mostrarStatus('Por favor, corrija os erros antes de enviar.', 'error');
            return;
        }
        
        // Simular envio (aqui você integraria com seu backend)
        enviarFormulario();
    });
    
    function enviarFormulario() {
        // Mostrar estado de carregamento
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitStatus.style.display = 'none';
        
        // Coletar dados do formulário
        const formData = {
            nome: nomeInput.value.trim(),
            email: emailInput.value.trim(),
            telefone: telefoneInput.value.trim(),
            produto: document.getElementById('produto').value,
            mensagem: mensagemInput.value.trim()
        };
        
        // Simular envio para WhatsApp (método alternativo)
        setTimeout(() => {
            enviarViaWhatsApp(formData);
        }, 1500);
    }
    
    function enviarViaWhatsApp(dados) {
  // Obter número do WhatsApp da variável CSS
  const numeroWhatsApp = getComputedStyle(document.documentElement)
    .getPropertyValue('--whatsapp-number')
    .replace(/"/g, '')
    .trim();
        
        let mensagem = `*Nova solicitação de orçamento*\n\n`;
        mensagem += `*Nome:* ${dados.nome}\n`;
        mensagem += `*E-mail:* ${dados.email}\n`;
        mensagem += `*Telefone:* ${dados.telefone}\n`;
        
        if (dados.produto) {
            mensagem += `*Produto:* ${dados.produto}\n`;
        }
        
        mensagem += `*Mensagem:* ${dados.mensagem}\n\n`;
        mensagem += `_Enviado através do site AgForce_`;
        
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        
        // Resetar botão
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Mostrar sucesso
        mostrarStatus('Redirecionando para WhatsApp...', 'success');
        
        // Abrir WhatsApp
        setTimeout(() => {
            window.open(urlWhatsApp, '_blank');
            
            // Limpar formulário após envio
            setTimeout(() => {
                form.reset();
                limparTodosErros();
                submitStatus.style.display = 'none';
            }, 2000);
        }, 1000);
    }
    
    function mostrarStatus(message, type) {
        submitStatus.textContent = message;
        submitStatus.className = `submit-status ${type}`;
        submitStatus.style.display = 'block';
    }
    
    function limparTodosErros() {
        const errorElements = form.querySelectorAll('.error-message');
        const inputs = form.querySelectorAll('input, textarea, select');
        
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        inputs.forEach(input => {
            input.style.borderColor = '#e1e5e9';
        });
    }
    

});