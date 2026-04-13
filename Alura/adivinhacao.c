#include <stdio.h>
#include <locale.h>

int main(){
    setlocale(LC_ALL,"");

    int numS = 37;
    char sep[50] = "========================";
    int resp;

//Cabeçalho
    puts(sep);
    printf("| Jogo da Adivinhação! |\n"); 
    puts(sep);

    printf("Tente acertar o número que pensei!\n--> ");
    scanf("%d",&resp);

//condicional
    while(resp != numS){
        printf("ERROOU! MUITO BURRO kkkkkk tenta dnv aí\n--> ");
        scanf("%d",&resp);
    }
    puts(sep);
    printf("Parabéns! Acertou miseravi");
}
