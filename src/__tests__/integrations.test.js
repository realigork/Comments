import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';

import Root from 'Root';
import App from 'components/App';


beforeEach(() => {
  moxios.install(); // stop any requests
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {  // intercept the request to this url
    status: 200,
    response: [{ name: 'Fetch 1' }, { name: 'Fetch 2' }]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
  // attempt to render the entire app
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  // find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click');

  // expect to find a list of comments
  // need a short delay to make sure we receive comments first
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(2);
    done();
    wrapped.unmount();
  });
});