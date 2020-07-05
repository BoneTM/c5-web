<template>
  <div>
    <router-link
      v-for="tag in visitedViews"
      ref="tag"
      :key="tag.path"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      tag="span"
      class="tags-view-item"
      @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
      @contextmenu.prevent.native="openMenu(tag, $event)"
    >
      {{ tag.title }}
      <span
        v-if="!isAffix(tag)"
        class="el-icon-close"
        @click.prevent.stop="closeSelectedTag(tag)"
      />
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['visitedViews']),
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
  },
  addTags() {
    const { name } = this.$route;
    if (name) {d
      this.$store.dispatch('tagsView/addView', this.$route);
    }
    return false;
  },
  moveToCurrentTag() {
    // const tags = this.$refs.tag
    // this.$nextTick(() => {
    //   for (const tag of tags) {
    //     if (tag.to.path === this.$route.path) {
    //       this.$refs.scrollPane.moveToTarget(tag)
    //       // when query is different then update
    //       if (tag.to.fullPath !== this.$route.fullPath) {
    //         this.$store.dispatch('tagsView/updateVisitedView', this.$route)
    //       }
    //       break
    //     }
    //   }
    // })
  },
};
</script>

<style scoped></style>
