package cn.ictgu.serv.service;

public interface AttentionService {

    /**
     * 关注/取消关注
     */
    boolean attention(Long userId, Long otherId);

    /**
     * 是否已关注
     */
    boolean isAttention(Long userId, Long otherId);

}
