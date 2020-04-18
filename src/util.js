const utility = {
	getEntriesFromList(record, property) {
    returnrecord.reduce((total, value) => {
      total += value[property];
      return total;
    }, []);
  }
	
}