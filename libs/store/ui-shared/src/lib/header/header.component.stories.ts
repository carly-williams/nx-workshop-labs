import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { HeaderComponent } from './header.component';
//IMPORT TOOLBAR MODULE
import { MatToolbarModule } from '@angular/material/toolbar';

//IMPORT THEME
import '@angular/material/prebuilt-themes/deeppurple-amber.css';

export default {
  title: 'HeaderComponent',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [MatToolbarModule],
    })
  ],
} as Meta<HeaderComponent>;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  component: HeaderComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    title:  '',
}