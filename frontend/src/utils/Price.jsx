export default function Price({ children }) {
    let fixed = Number(children).toFixed(2);
    let addForm = `R$ ${fixed}`;
    let formatted = addForm.replace('.', ',');

    return (
        <span>{formatted}</span>
    );
}
