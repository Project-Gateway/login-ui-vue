<template>
  <div class="main-div">
    <b-breadcrumb v-bind:items="breadcrumb"/>

    <b-form ref="form" v-on:submit="onSubmit" v-on:reset="onReset" novalidate>
      <b-form-group id="emailInputGroup"
                    label="Email address:"
                    label-for="emailInput">
        <b-form-input id="emailInput"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email"
                      v-bind:state="valid('email')">
        </b-form-input>
        <b-form-invalid-feedback>{{validationErrors.email}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="passwordInputGroup"
                    label="Password:"
                    label-for="passwordInput">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password"
                      v-bind:state="valid('password')">
        </b-form-input>
        <b-form-invalid-feedback>{{validationErrors.password}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="roleInputGroup"
                    label="Role:"
                    label-for="roleInput">
        <b-form-select id="roleInput"
                       v-bind:options="roles"
                       required
                       v-model="form.role"
                       v-bind:state="valid('role')">
        </b-form-select>
        <b-form-invalid-feedback>{{validationErrors.role}}</b-form-invalid-feedback>
      </b-form-group>
      <b-alert dismissible variant="danger" v-bind:show="!!error" v-on:dismissed="error=null">
        {{ error }}
      </b-alert>
      <b-button type="submit" variant="primary">Create</b-button>
      <b-button type="reset" variant="danger">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import loginApiConfig from '../config/login-api';

export default {
  data() {
    return {
      breadcrumb: [
        {
          text: 'Users',
            to: '/users/index',
        },
        'New'
      ],
      roles: [
        { text: 'Select One', value: null },
        ...this.$store.state.identity.childRoles
      ],
      form: {
        email: '',
        password: '',
        role: null
      },
      validated: false,
      validationErrors: {
        email: null,
        name: null,
        role: null
      },
      error: null
    };
  },
  methods: {
    valid (field) {
      return this.validated ? !this.validationErrors[field] : null;
    },
    onSubmit (evt) {
      evt.preventDefault();
      axios({
        url: localApiConfig.URL,
        data: this.form,
        method: 'POST'
      }).then(({data: payload}) => {
        this.validated = true;
        this.$router.push('/users/index');
      }).catch((error) => {
        switch (error.response.status) {
          case 422:
            const data = error.response.data;
            for (let key in this.validationErrors) {
              this.validationErrors[key] = data[key] ? data[key][0] : null;
            }
            this.validated = true;
            break;
          default:
            this.error = 'Error creating the user.';
        }
      });
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.password = '';
      this.form.role = null;
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<style scoped>
  div.main-div {
    padding: 10px 10px;
  }
</style>
