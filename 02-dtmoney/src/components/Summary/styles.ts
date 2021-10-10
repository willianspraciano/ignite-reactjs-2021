import styled from 'styled-components';

export const Container = styled.div`
  display: grid; // Pois são três itens um ao lado do outro
  grid-template-columns: repeat(3, 1fr); // Repete 3 colunas de tamanhos iguais
  gap: 2rem; // Espaçamento entre cada item do grid
  margin-top: -10rem; // para jogar os itens para cima

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex; // por padrão tem o flex-direction: row
      align-items: center;
      justify-content: space-between;
    }

    strong {
      // por padrão o strong vem com display: inline
      display: block; // block é usado para dar um margin-top depos
      margin-top: 1rem; // não funciona com display:inline
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.highlight-background {
      //quando for div e tiver esse className
      background: var(--green);
      color: #fff;
    }
  }
`;
