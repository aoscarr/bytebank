// a funcao $() eh um atalho (Short Range) para a funcao jQuery()

var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");


$(function () {
   atualizaTamanhoFrase();
   inicializaContadores();
   inicializaCronometro();
   $("#botao-reiniciar").click(reiniciaJogo);
   inicializaMarcadores();
});



function atualizaTamanhoFrase() {
   var frase = $(".frase").text();
   var numPalavras = frase.split(" ").length;
   var tamanhoFrase = $("#tamanho-frase");
   tamanhoFrase.text(numPalavras);
}
function inicializaContadores() {
   campo.on("input", function () {
      var conteudo = campo.val();
      var qtdPalavras = conteudo.split(/\S+/).length; //expressao regular que busca por qualquer espaco vazio
      var qtdLetras = conteudo.length;

      $("#contador-palavras").text(qtdPalavras-1);
      $("#contador-caracteres").text(qtdLetras);
   });
}

function inicializaCronometro(){
   var tempoRestante = $("#tempo-digitacao").text();
   campo.one("focus", function () {
      $("#botao-reiniciar").attr("disabled", true);

      var cronometroID = setInterval(function () {
         tempoRestante--;
         $("#tempo-digitacao").text(tempoRestante);
         if(tempoRestante < 1){
            clearInterval(cronometroID);
            campo.attr("disabled", true);
            
            $("#botao-reiniciar").attr("disabled", false);
            campo.toggleClass("campo-desativado", true);

         }
      }, 1000)

   });
}


//eventos mais comuns tem uma funcao propria
$("#botao-reiniciar").click(reiniciaJogo());

function reiniciaJogo() {
   campo.attr("disabled", false);
   campo.val("");
   $("#contador-palavras").text("0");
   $("#contador-caracteres").text("0");
   $("#tempo-digitacao").text(tempoInicial);
   inicializaCronometro();
   campo.toggleClass("campo-desativado", false);
   campo.removeClass("borda-vermelha");
   campo.removeClass("borda-verde");

}

function inicializaMarcadores() {
   var frase = $(".frase").text();
   campo.on("input", function () {
      var digitado = campo.val();

      // var comparavel = frase.substr(0, digitado.length);
      //
      // if(comparavel == digitado) {
      //    campo.addClass("borda-verde");
      //    campo.removeClass("borda-vermelha");
      // }
      // else{
      //    campo.addClass("borda-vermelha");
      //    campo.removeClass("borda-verde");
      // }
      //forma 2 de fazer.
      if(frase.startsWith(digitado)){
         campo.addClass("borda-verde");
         campo.removeClass("borda-vermelha");
      }else{
         campo.addClass("borda-vermelha");
         campo.removeClass("borda-verde");
      }

   });
}
