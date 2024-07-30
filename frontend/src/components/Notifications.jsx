export const Notification = ({ message }) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className="message">
                <p>{message}</p>
            </div>
        )
    }
}

export const NotificationError = ({ message }) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className="message-error">
                <p>{message}</p>
            </div>
        )
    }
}
