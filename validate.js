function valida(input) {
  const tipoDeInput = input.dataset.tipo
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input)
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove('dados-invalido')
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
  } else {
    input.parentElement.classList.add('dados-invalido')
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML =
      mostraMensagemDeErro(tipoDeInput, input)
  }
}

const mensagensDeErro = {
  nome: {
    valueMissing: 'O campo nome não pode estar vazio',
    customError: 'O nome não pode ter mais de 50 caracteres'
  },
  email: {
    valueMissing: 'O campo de email não pode estar vazio',
    typeMismatch: 'O e-mail digitado não é válido'
  },
  assunto: {
    valueMissing: 'O campo assunto não pode estar vazio'
  },
  mensagem: {
    valueMissing: 'O campo mensagem não pode estar vazio'
  }
}

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = ''
  tiposDeErro.forEach(erro => {
    if (input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro]
    }
  })
  return mensagem
}

const validadores = {
  nome: input => validaNome(input),
  email: input => validaEmail(input),
  assunto: input => validaAssunto(input),
  mensagem: input => validaMensagem(input)
}

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
  input.addEventListener('blur', evento => {
    valida(evento.target)
  })
})

const textareas = document.querySelectorAll('textarea')
textareas.forEach(textarea => {
  textarea.addEventListener('blur', evento => {
    valida(evento.target)
  })
})

const tiposDeErro = ['valueMissing', 'typeMismatch', 'customError']

function validaNome(input) {
  const nome = input.value
  let mensagem = ''

  if (nome.length > 50) {
    mensagem = 'O nome não pode ter mais que 50 caracteres'
  }
  input.setCustomValidity(mensagem)
}

function validaAssunto(input) {
  const assunto = input.value
  let mensagem = ''

  if (assunto.length > 50) {
    mensagem = 'O assunto não pode ter mais que 50 caracteres'
  }
  input.setCustomValidity(mensagem)
}

function validaMensagem(input) {
  const mensagemForm = input.value
  let mensagem = ''

  if (mensagemForm.length > 300) {
    mensagem = 'A mensagem não pode ter mais que 300 caracteres'
  }
  input.setCustomValidity(mensagem)
}

function isEmail(email) {
  return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email
  )
}

function validaEmail(input) {
  const email = input.value
  let mensagem = ''

  if (!isEmail(email)) {
    mensagem = 'O email está incorreto'
  }

  input.setCustomValidity(mensagem)
}
