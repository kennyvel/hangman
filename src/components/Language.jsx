export default function Language(props) {
    const styles = {
        backgroundColor: props.backgroundColor,
        color: props.color
    }

    return (
        <div style={styles} className="language">
            <h2>{props.name}</h2>
        </div>
    )
}