<?php
$amount = (int) filter_var($_POST['amount'], FILTER_SANITIZE_NUMBER_INT);
$time = (int) filter_var($_POST['time'], FILTER_SANITIZE_NUMBER_INT);

$interest_rate = $time * 2;
$income = $amount + (($amount * $interest_rate / 100) * $time);
$profit = $income - $amount;

echo 'Вы получаете:';
echo '- ' . $interest_rate . ' % годовых;';
echo '- ' . $income . ' руб.;';
echo '- ' . $profit . 'руб. чистой прибыли.';
?>