export function RepositoryItem(props) {
  return (
    <li>
      <strong>{props.repository?.name}</strong>
      <p>{props.repository?.description ?? 'Forms in React'}</p>
      <a href={props.repository?.html_url}>Acessar repositórios</a>
    </li>
  );
}
