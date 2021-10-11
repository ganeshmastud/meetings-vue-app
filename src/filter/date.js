
const dateFilter = ( isoDate, format ) => {
    const d = new Date( isoDate );
    console.log("edit date :",d.getMonth());
    if( format === 'local' ) {
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    } else {
        return d.toDateString();
    }
};

export default dateFilter;