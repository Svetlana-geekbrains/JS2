//let str1 = document.querySelector('.task1-text')
//let result = str1.match(/one/gim);                // ошибка - match не явялется функцией

let str2 = "One: 'Hi Mary.' <br>Two: 'Oh, hi.' <br>One: 'How are you doing?' <br>Two: 'I'm doing alright. How about you?' <br>One: 'Not too bad. The weather is great isn't it?' <br>Two: 'Yes. It's absolutely beautiful today.' <br>One: 'I wish it was like this more frequently.' <br>Two: 'Me too.' <br>One: 'So where are you going now?' <br>Two: 'I'm going to meet a friend of mine at the department store.' <br>One: 'Going to do a little shopping?' <br>Two: 'Yeah, I have to buy some presents for my parents.' <br>One: 'What's the occasion?' <br>Two: 'It's their anniversary.' <br>One: 'That's great. Well, you better get going. You don't want to be late.' <br>Two: 'I'll see you next time.' <br>One: 'Sure. Bye.' ";

document.querySelector('.task1-text').innerHTML = str2;

console.log(str2.match(/(\s'|'\s)/g)); //почему-то не работает через /(\b'|'\b)/g , хотя это границы слов (вроде бы)
let repl = '"';
console.log(repl);
document.querySelector('.task1-text-new').innerHTML = str2.replace(/(\s'|'\s)/g, `${repl}`);



