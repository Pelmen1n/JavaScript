function globalError() {
  const error = Error('Глобальная ошибка');
  error.name = 'GlobalError';
  throw error;
}

function localError() {
  const error = Error('Локальная ошибка');
  error.name = 'LocalError';
  throw error;
}

function testErrorScope(fn) {
  try {
    try {
      fn();
    } catch (error) {
      if (error.name === 'LocalError') {
        console.log('Обнаружена локальная ошибка');
        console.error(error);
      } else {
        // Если ошибка не LocalError, выбрасываем её дальше
        throw error;
      }
    }
  } catch (error) {
    console.log('Обнаружена глобальная ошибка');
    console.error(error);
  }
}

testErrorScope(localError);
testErrorScope(globalError);