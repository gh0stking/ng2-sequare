import { Ng2SequarePage } from './app.po';

describe('ng2-sequare App', () => {
  let page: Ng2SequarePage;

  beforeEach(() => {
    page = new Ng2SequarePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
