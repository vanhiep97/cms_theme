<template>
    <div class="box-language">
        <b-dropdown :text="$t('commons.label_language')">
            <b-form-group :label="$t('commons.label_language')">
                <b-form-radio-group
                    name="radios-stacked"
                    stacked
                    :checked="locale"
                    @input="changeLanguage"
                    >
                    <b-form-radio
                        v-for="(locale, key) in locales"
                        :value="locale.text"
                        :key="key">
                        {{ $t("commons.locale.language_title_" + locale.text) }}
                    </b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </b-dropdown>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { loadMessages } from "../plugins/i18n";
import { loadVeeValidate } from "../plugins/vee-validate"

export default {
    name: 'BoxLanguage',
    data() {
        return {
            locales: [
                {
                    text: "ja",
                    image_url: "/images/language/ja.png"
                },
                {
                    text: "en",
                    image_url: "/images/language/en.png"
                },
                {
                    text: "vi",
                    image_url: "/images/language/vi.jpg"
                }
            ],
            fullPath: '',
            keyword: '',
            localeSelect: null
        }
    },
    computed: {
        ...mapState("lang", {
            locale: state => {
                return state.locale;
            }
        }),
    },
    methods: {
        changeLanguage(locale) {
            if (this.$i18n.locale !== locale) {
                let localeSelect = this.locales.filter(item => item.text == locale);
                this.localeSelect = localeSelect.length > 0 ? localeSelect[0] : 'ja';
                loadMessages(locale);
                loadVeeValidate(locale);
                this.$store.dispatch("lang/setLocale", { locale });
            }
        }
    },
    created() {
        let localeSelect = this.locales.filter(item => item.text == this.locale);
        this.localeSelect = localeSelect.length > 0 ? localeSelect[0] : 'ja';
    }
}
</script>
