// Esse programa tem o intuito de verificar se um CPF passado pelo...
// usuário é válido ou não

function ValidaCPF(cpf) {
  // Retira os pontos e o hífen da String cpf
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function () {
      return cpf.replace(/\D+/g, '')
    }
  })
}

// Função que verifica se o CPF é válido ou não
ValidaCPF.prototype.valida = function () {
  if (typeof this.cpfLimpo === 'undefined') return false
  if (this.cpfLimpo.length !== 11) return false
  if (this.isSequencia()) return false

  const cpfParcial = this.cpfLimpo.slice(0, -2)
  const digito1 = this.calculaDigito(cpfParcial)
  const digito2 = this.calculaDigito(cpfParcial + digito1)

  const cpfValidado = cpfParcial + digito1 + digito2
  return cpfValidado === this.cpfLimpo
}

// Calcula o 10 e o 11 dígito do CPF usando o algoritmo estabelecido pelo Governo Federal
ValidaCPF.prototype.calculaDigito = function (cpfParcial) {
  const arrayCPF = Array.from(cpfParcial)

  let multRegressivo = arrayCPF.length + 1
  const total = arrayCPF.reduce((ac, valor) => {
    ac += Number(valor) * multRegressivo
    multRegressivo--
    return ac
  }, 0)

  const digito = 11 - (total % 11)
  return digito > 9 ? '0' : String(digito)
}

// Verifica se o CPF passado pelo usuário é uma sequência de números iguais
ValidaCPF.prototype.isSequencia = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
  return sequencia === this.cpfLimpo
}
