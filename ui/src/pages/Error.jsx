const Error = () => {

  return (
    <div style={styles.errorContainer}>
      Oops...Error. Please try again later
    </div>
  )
}

const styles = {
  errorContainer: {
    fontSize: '15px',
    padding: '40px'
  }
}

export default Error