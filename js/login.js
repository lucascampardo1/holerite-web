const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const emailError = document.getElementById('emailError');
const senhaError = document.getElementById('senhaError');
const toggleBtn = document.getElementById('toggleSenha');
const iconSenha = document.getElementById('iconSenha');
const btnLogin = document.getElementById('btnLogin');
const alertBox = document.getElementById('alertBox');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SENHA_MIN = 6;

toggleBtn.addEventListener('click', () => {
    const isPassword = senhaInput.type === 'password';
    senhaInput.type = isPassword ? 'text' : 'password';
    
    toggleBtn.classList.toggle('senha-visivel', isPassword);
});


function validarEmail(valor) {
    if (!valor.trim()) return 'O e-mail é obrigatório.';
    if (!EMAIL_REGEX.test(valor.trim())) return 'E-mail inválido.';
    return '';
}

function validarSenha(valor) {
    if (!valor) return 'A senha é obrigatória.';
    if (valor.length < SENHA_MIN) return `A senha deve ter pelo menos ${SENHA_MIN} caracteres.`;
    return '';
}

function mostrarErro(input, span, mensagem) {
    span.textContent = mensagem;
    if (mensagem) input.classList.add('invalid');
    else input.classList.remove('invalid');
}

emailInput.addEventListener('blur', () => {
    mostrarErro(emailInput, emailError, validarEmail(emailInput.value));
});

senhaInput.addEventListener('blur', () => {
    mostrarErro(senhaInput, senhaError, validarSenha(senhaInput.value));
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('invalid')) {
        mostrarErro(emailInput, emailError, '');
    }
});
senhaInput.addEventListener('input', () => {
    if (senhaInput.classList.contains('invalid')) {
        mostrarErro(senhaInput, senhaError, '');
    }
});

function mostrarAlerta(mensagem, tipo = 'error') {
    alertBox.textContent = mensagem;
    alertBox.className = `alert ${tipo}`;
    alertBox.hidden = false;
    setTimeout(() => { alertBox.hidden = true; }, 5000);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const erroEmail = validarEmail(emailInput.value);
    const erroSenha = validarSenha(senhaInput.value);

    mostrarErro(emailInput, emailError, erroEmail);
    mostrarErro(senhaInput, senhaError, erroSenha);

    if (erroEmail || erroSenha) {
        mostrarAlerta('Corrija os campos destacados.');
        return;
    }

    btnLogin.disabled = true;
    btnLogin.querySelector('.btn-text').textContent = 'Entrando...';
    btnLogin.querySelector('.btn-loader').hidden = false;

    try {
        await new Promise(resolve => setTimeout(resolve, 1200));

        const emailTeste = emailInput.value.trim().toLowerCase();
        const senhaTeste = senhaInput.value;

        if (emailTeste === 'admin@empresa.com' && senhaTeste === '123456') {
            mostrarAlerta('Login realizado com sucesso! Redirecionando...', 'success');
            setTimeout(() => {
                console.log('Redirecionar para dashboard.html');
            }, 1000);
        } else {
            mostrarAlerta('E-mail ou senha incorretos.');
        }
    } catch (err) {
        mostrarAlerta('Erro ao conectar. Tente novamente.');
    } finally {
        btnLogin.disabled = false;
        btnLogin.querySelector('.btn-text').textContent = 'Entrar';
        btnLogin.querySelector('.btn-loader').hidden = true;
    }
});