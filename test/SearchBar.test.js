import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SearchBar from "@/components/SearchBar.vue";

describe("SearchBar", () => {
  test("renders input field", () => {
    const wrapper = mount(SearchBar);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  
});
