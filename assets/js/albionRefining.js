function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const validate = (value) => {
  if (!value || value <= 0) {
    return 1;
  }
  return parseInt(value);
}

const calc = () => {
  const resources = validate(document.querySelector('#amountResources').value);
  const returnRate = validate(document.querySelector('#returnRate').value);
  const amountToProduceOne = validate(document.querySelector('#amountToProduceOne').value);

  if (returnRate >= 100 )  {
    return;
  }

  const result = calcAmount(Math.round(resources / amountToProduceOne), returnRate);
  document.querySelector('#result').innerHTML = Math.round(result);
}

const calcAmount = (resources, returnRate) => {
  if (resources <= 0) {
    return 0;
  }
  const returnedResources = Math.floor((resources * returnRate) / 100);
  return calcAmount(returnedResources, returnRate) + resources;
}