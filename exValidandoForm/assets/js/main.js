class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos()
  }

  // Método que captura o submit do usuário
  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e)
    })
  }

  // Método responsável por verificar se todos os campos e senhas são validos
  // e enviar o submit
  handleSubmit(e) {
    e.preventDefault()
    const camposValidos = this.camposSaoValidos()
    const senhasValidas = this.senhasSaoValidas()

    if (camposValidos && senhasValidas) {
      alert('Formulário enviado.')
      this.formulario.submit()
    }
  }

  // Esse método faz a verificação se as senhas passadas pelo usuário seguem
  // o padrão estabelecido pelo form e retorna verdadeiro(Está tudo correto) ou
  // falso(Alguma senha apresenta problema).
  senhasSaoValidas() {
    let valid = true

    const senha = this.formulario.querySelector('.senha')
    const repetirSenha = this.formulario.querySelector('.repetir-senha')

    if (senha.value !== repetirSenha.value) {
      valid = false
      this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.')
      this.criaErro(
        repetirSenha,
        'Campos senha e repetir senha precisar ser iguais.'
      )
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.')
    }

    return valid
  }

  // Esse método faz a verificação se os campos passados pelo usuário seguem
  // o padrão estabelecido pelo form e retorna verdadeiro(Está tudo correto) ou
  // falso(Algum campo apresenta problema).
  camposSaoValidos() {
    let valid = true

    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove()
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText

      if (!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`)
        valid = false
      }

      if (campo.classList.contains('cpf')) {
        if (!this.validaCPF(campo)) valid = false
      }

      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) valid = false
      }
    }

    return valid
  }

  // Esse método faz a verificação se o usuário passado segue
  // o padrão estabelecido pelo form e retorna verdadeiro(Usuário Correto) ou
  // falso(Usuário Incorreto).
  validaUsuario(campo) {
    const usuario = campo.value
    let valid = true

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.')
      valid = false
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(
        campo,
        'Nome de usuário precisar conter apenas letras e/ou números.'
      )
      valid = false
    }

    return valid
  }

  // Esse método faz a verificação se o CPF passado é válido.
  // É utilizado uma função construtora em outro arquivo JS que faz cálculo e
  // validação do CPF passado pelo usuário.
  // Retorna verdadeiro(CPF Correto) ou falso(CPF Incorreto).
  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value)

    if (!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido.')
      return false
    }

    return true
  }

  // Esse método cria as mensagens de erro que serão exibidas no site caso
  // o usuário digite algum campo ou senha errados.
  // O método recebe o campo digitado incorretamente e a mensagem que deve
  // ser exibida no site.
  criaErro(campo, msg) {
    const div = document.createElement('div')
    div.innerHTML = msg
    div.classList.add('error-text')
    campo.insertAdjacentElement('afterend', div)
  }
}

const valida = new ValidaFormulario()
