time=${1:-'30'}
echo $time
find ./views/data/ -mmin +${time} -xtype f -exec rm {} +