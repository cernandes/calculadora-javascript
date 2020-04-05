# Calculadora JS

Calculadora simples com funções básicas desenvolvida com HTML5, CSS3 e Javascript. O projeto visa o estudo das tecnologias e a lógica de programação. Ao longo do tempo o projeto sofrerá modificações para correção de falhas, melhorias na implementação do código através de boas práticas de programação e implementação de funcionalidades que possam agregar ao aprendizado.

# ![](/img/calculadora.png)


## Diário de bordo

O primeiro código javascript foi implementado de forma simples com uma programação funcional, visando apenas a implementação das funcionalidades básicas para atingir o primeiro propósito.
Após uma primeira refatoração o projeto passou para uma programação orientada a objetos, estabelecendo as boas práticas de programação e a reutilização de código, tornando possível fazer alteração no HTML como as mudanças nas tags do display, deixando mais simples a manipulação do elemento com apenas uma div.

Antes:

```
    <form name="form">
        <input class="display" name="display" maxlength="9" onfocus="focus">
    </form>
```

Depois:

```
    <div class="display"> </div>
```

Eliminação das chamadas de função para os eventos em cada botão, com isso agora os botões tem um link com as funções através de um “querySelector” na classe dos botões, e os eventos são capturados com um “addEventListener”.

Antes:

```
    <tr>
        <td><input class="btn" type="button" value="C" onclick="clean()"></td>
        ...
    </tr>
```

Depois:

```
    <tr>
        <td><input class="btn" type="button" value="C"></td>
        ...
    </tr>
```

Publicado no GitHub Pages https://cernandes.github.io/calculator-js/

