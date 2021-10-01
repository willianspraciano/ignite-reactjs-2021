import { useState, useEffect } from 'react';
import { RepositoryItem } from './RepositoryItem';

import '../styles/repositories.scss';

// https://api.github.com/orgs/rocketseat/repos

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositires] = useState<Repository[]>([]);

  useEffect(() => {
    //dispara uma função quando algo mudar dentro da aplicação
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then((response) => response.json())
      .then((data) => setRepositires(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositório</h1>
      <ul>
        {repositories.map((repository) => {
          return (
            <RepositoryItem key={repository.name} repository={repository} />
          );
        })}
      </ul>
    </section>
  );
}
