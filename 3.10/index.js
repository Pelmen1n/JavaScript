const cardInserted = true; // Указывает, что карта вставлена
const balance = 500; // Доступная сумма

const amount = 1000; // Ввод суммы операции

if (cardInserted == 1 && balance >= amount) {
  console.log('Операция выполняется')
}
else {
  console.log('Операция отклонена')
}