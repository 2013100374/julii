export default function FormGroup({ children,...rest }) {
    return (
        <>
            <div className={`form-group ${rest?.className || ''}`} {...rest}>
                {children}
            </div>
        </>
    )
}