<?php
$amount = (int) filter_var($_POST['amount'], FILTER_SANITIZE_NUMBER_INT);
$time = (int) filter_var($_POST['time'], FILTER_SANITIZE_NUMBER_INT);

$interest_rate = $time * 2;
$income = $amount + (($amount * $interest_rate / 100) * $time);
$profit = $income - $amount;

echo '
    <h1>Вы получаете:</h1>

    <ul>
        <li>' . $interest_rate . '% годовых;</li>
        <li>' . $income . ' руб.;</li>
        <li>' . $profit . ' руб. чистой прибыли.</li>
    </ul>

    <a href="../index.html#calculator">Вернуться назад</a>
    ';
?>