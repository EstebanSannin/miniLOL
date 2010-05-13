/*
 * exec command
 * Author: Stefano Viola ---> Esteban Sannin
 *
 *
 *
 *
 *
 */


#include <stdio.h>
#include "monitor.h"


void stamp_command(char *string_title, char *string_command);
void main(int argc, char *argv[], char *envp[]){
  //Genera la pagina html
  printf("Content-type: text/html\n\n"
	 "<html>\n"
	 "<head>\n"
	 "<title>Monitoring Router</title>\n"
	 "</head>\n"
	 "<body>\n");  
  
  stamp_command("Memory:", "free");
  stamp_command("Disk usage:", "df");
  
    printf("</body>");
}

void stamp_command(char *string_title, char *string_command){
  printf("<p>%s</p>",string_title);
  printf("<pre>");
  command(string_command);
  printf("</pre>");
}

///testing funzione per comandi da shell
int command(char *command){
 FILE *fp;
 char line[256];
 int iRet = 0;
 fp = popen(command, "r");

 if (fp != NULL) {
         while (fgets(line, sizeof(line), fp)) {
                 printf("%s", line);
         }
         pclose(fp);
         iRet = 0;
 } else {
         iRet = -1;
 }
 return iRet;
                      
}



