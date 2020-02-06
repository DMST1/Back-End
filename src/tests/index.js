import { Selector } from 'testcafe'


const title = Selector('pre');


fixture('Test')
    .page('http://localhost:4000');


test('Test', async(t) => {
    await t
        .expect(title.innerText).eql('Cannot GET /')
})